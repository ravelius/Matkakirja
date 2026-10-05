# Linssiseppä 2:n luovutus 5.10.2026 (klo 06.0x)

Edellinen: viesti-linssiseppa2-luovutus-20261004.md. Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe.
VUOROT: käännös- ja simuvuoro aina Julkaisijalta ("NYT käännös", "SIMU NYT"). Ilmoita: "KÄÄNNETTY <sha>, lukko vapaa" ja "simu vapaa".

## ISS-ohjaamo, proto-haara linssiseppa2/iss-ohjaamo (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-ohjaamo)
Ohjaamo siirtyy junaan 143 (Päätoimittaja 02.36). Sen ehtona on, että kuusi maailmakuvaa hyväksytään.
Kuvat lähtevät Päätoimittajalle vasta, kun olen tyytyväinen niihin: ei sumeutta, kiiloja eikä saumoja. Mukana Meksiko täysikokoisena.
- LCD (9f2af091) ja cupola cold open (06ce558b, BUILD 139) ovat valmiit. Natiivi-UI:lla on 9f2af091. Kun kuvat on hyväksytty,
  pyydä Natiivi-UI:ta mergeämään iss-ohjaamon kärki.
- Commitit 5.10.:
  - d87b90a6: S2-limitys ristihäivytetään 9,8 km:n leveydeltä, varakuva vain aukkoon.
  - 2d53f9f5: indeksin versio on vakio S2Maailma.Versio, ja välimuisti on versioitu.
  - ad726e1f: usvatasoitus mitataan limitysparien saman maan mediaanierotuksena. Vanha tummin 1 % luki meren usvattomaksi
    (Meksikon kaista −40).
  - 69e49d69: **v2-juuri** (Karttaseppä: luvallinen, 6/6 indeksiä ämpärissä). Kierros 2 hakee datattomille lehdille
    toisen radan täytekuvan ("toinen_rata", valinta 3).
- Testit: Linssit 647+ läpi, unity-tarkistus 0.

## Avoinna
1. **Käännä 69e49d69** (Julkaisijalta vuoro) ja aja kuusi kuvaa F2D9B022:lla: lokit/linssiseppa2-skriptit-20261001/maailma-kuvat.sh
   (APP=, OUT=, LUPA=, PAIKAT=). Päätoimittajan toiveesta paikat ovat: amazonia -3.1 -60.0, **amazonia-20mrc -2.26 -59.85**,
   sahara 25.0 9.0, australia -25.3 131.0, pohjois-amerikka 36.1 -112.1, meksiko 31.8 -114.8, venetsia 45.44 12.33 ja
   **kanaria-28sca 32.08 -16.59**. Täytekiilan sauma tarkistetaan 20MRC:stä (tummempi) ja 28SCA:sta (vaaleampi). Jos sauma
   näkyy, seuraava erä on Karttasepän kiilan sävytasaus indeksiin. Huom.: usvatasoitus ad726e1f vertaa myös täytekuvaa
   limitykseen, joten se voi tasata kiilan jo itse.
2. **Meksikon suiston vaalea suorakulmio** (ecf0883f, lokit/linssiseppa2-maailma-ecf0883f/kuvat/20261005-024336.jpg) näkyy yhä.
   Todennäköinen syy on, että SCL merkitsee kirkkaat suola- ja vuorovesitasangot pilveksi. Silloin pilvisen lehden varakuva
   (valinta 1, eri päivä) näkyy lehden muotoisena suorakulmiona. Offline-toisto:
   `INDEKSI_JSON=<ix-amerikka.json> TASOT_PPM=mx.ppm TASOT_KULMA="31.258 -117.525 424 31.858 -114.447 122" TASO=11
   PILVIMASKI=1 USVA=1 ./kaanna.sh KaikkiTasot` (Linssit-testit; hidas, hakee koko resoluution curlilla). Korjausehdotus: pilveksi
   merkitty pikseli vaihdetaan varakuvaan vain, jos varakuva on selvästi tummempi (oikea pilvi). Kirkas pinta, joka on molemmissa
   kirkas, pidetään ensisijaisena.
3. Saharan ohut suora katkoviiva vasemmassa alakulmassa: todennäköisesti 1 px:n nodata-rako ruudun 32RNN radan reunassa (nodata 3 %).
4. Pilvien "popcorn"-ilme on omistajan 1.10. linjaus, ei muuteta. Meksikon aavikon vaaleus on dataa.

## Muut
- Poistettu wt/linssiseppa2-web-main (Päätoimittaja, levy). HEAD on mainissa squashina 5441e20e8.
- Scratchpadin *-app-kopiot siivotaan käännösten jälkeen (~440 Mt kpl).

## Päivitys 5.10. klo 06.4x: v2-ajo 10c31692 (kahdeksan kuvaa, laattavedos)
Kuvat: /Users/Shared/Claude/proto-3d/lokit/linssiseppa2-maailma-10c31692/kuvat. Vedos: …/laatat/laatat-<id>/<taso>/<x>/<y>.png.
- **Amazonian kiila on poistunut** toisen radan täytteellä (20261005-033346.jpg). Venetsia, Australia ja Pohjois-Amerikka ovat hyviä.
- 20MRC (033507): täytteen raja näkyy lievänä pystysaumana, ja täyte on hieman samea. Karttaseppä tekee kiilan sävytasauksen.
- Kanaria 28SCA (034056): avomerellä on selvät suorat heijastussaumat, eri ottopäivien auringon heijastus. Ei vielä kunnossa.
- Meksikon suiston suorakulmio (033930) näkyy myös laatoissa (taso 4: x 9, y 16). Syy on 11SPR:n (2024-08-27) ja 11SQR:n
  (2023-07-01) eri ottopäivä, koska vuorovesitasangon kirkkaus vaihtelee. Usvasiirto ei korjaa tätä. Pyyntö Karttasepälle:
  naapuriruuduille sama datatake aina kun mahdollista. Offline-toisto v1-indeksillä ei näyttänyt tätä (eri lehtijako ja tarkkuus).
- Viestit Päätoimittajalle ja Karttasepälle 06.4x. Kuvia EI ole lähetetty: Kanaria ja Meksiko eivät ole vielä kunnossa.
- Seuraavaksi, kun Karttasepän indeksi päivittyy: sama kahdeksan kuvan ajo (vaihda vain APP ja OUT), sitten tarkistus ja lähetys.
- 06.4x: **v2b-tuki valmis** (iss-ohjaamo d227d4c9): valinta.savy {vahvistus, siirto} → TCI · vahvistus + siirto ennen usvaa ja lutia.
  Juuri on yhä "v2". Karttasepän v2b valmistuu noin klo 8 polkuun s2-indeksi/v2b/. Vaihda S2Maailma.Versio = "v2b" VASTA
  Päätoimittajan kuittauksen jälkeen, käännä ja aja kahdeksan kuvaa. Saman datataken indeksi (v2c, 3–4 h) odottaa
  Päätoimittajan etusijapäätöstä.
