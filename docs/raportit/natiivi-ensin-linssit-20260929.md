# Natiivi ensin: linssit, jotka natiivissa saa selvästi paremmiksi (Linssiseppä 29.9.2026)

Omistaja 29.9. (Raamattu 47f3bcf3f): *"Ei tehdä jatkossa mitään linssejä webbiin, jos ne saa tehtyä toisella tavalla paremmin
natiiviin."* Järjestys on vaikuttavuuden mukaan. Työmäärä on Linssisepän arvio uudesta koodista ja datasta. Kaikki
ehdokkaat rakentuvat natiivissa jo oleville osille.

| # | Linssi | Miksi natiivissa selvästi parempi | Valmiina natiivissa | Työmäärä |
|---|---|---|---|---|
| 1 | **Tähtitaivas** (reaaliaikainen) | Puhelinta osoitetaan taivaalle (gyroskooppi, AttitudeSensor), ja näkymä on juuri tämän hetken taivas pelaajan kaupungista. Mukana tähtikuviot, Kuu vaiheineen, planeetat ja Linnunrata. Maasta katsottuna horisontti ja hämärä. | BSC5-tähdet (1 656 kpl) ja Kuu (KyydinTaivas, Meeus), GMST ja ECI → maailma, aurinko (Iss/Aurinko), kameran Kuvaa-rajapinta | M: noin 600 riviä + tähtikuvioviivat (IAU, PD) ja planeetat (Meeus-lyhennelmä). 3–4 erää, laitetesti gyrolla |
| 2 | **Yökartta** (HDR-hehku) | Maapallo yöllä: kaupunkien valot hehkuvat HDR-bloomissa, yö/päivä-raja liikkuu todellisesta auringosta, ja valot syttyvät hämärän mukana. Webin kanvas ei tee bloomia eikä reaaliaikaista terminaattoria sujuvasti. | Yokuori (valot, voima 0,96 omistajan 28.9. vertailusta), Black Marble -laatat, aurinko, bloom-putki (Cupola/kyyti) | S–M: noin 300 riviä. 1–2 erää, pienin riski |
| 3 | **Topografia 3D** | Oikea maasto Cesiumilla: vuoret nousevat, kun kameraa kallistaa, ja korkeutta voi liioitella liukusäätimellä. Web näyttää vain varjostetun reliefikuvan. | Karttasepän quantized-mesh-maasto (MaastoLaatat), KorkeusKerroin, kallistus, reliefi | M: noin 400 riviä. Riski: maaston kattavuus ja polttotasot (Karttaseppä) ja kallistuksen rajat (Natiiviseppä) |
| 4 | **Vesistöt, virtaava vesi** | Joet virtaavat oikeaan suuntaan (virtausvarjostin jokiviivoja pitkin, nopeus valuma-alueen koosta), ja järvissä on kevyt kimmellys. Nyt vesistöt ovat staattinen kuva. | Vesistöt-linssi ja jokiviivat pallolla, Kynäviiva- ja Vana-varjostimet | S–M: noin 250 riviä + suuntadata (jokiviivojen suunta lähteeltä laskuun, Karttaseppä) |
| 5 | **Maapallon vuosi** (pilvet, lumi, valo GPU:lla) | Kuukausipinnat (BMNG) ristihäivytetään GPU:lla, ja lumiraja ja pilvet liikkuvat päivä päivältä. | Linssi on olemassa (Linssiseppä 2), BMNG-sarja, Pilvet-varjostin | M–L. **Linssiseppä 2:n linssi**, en aloita sitä ilman jakoa |

**Aloitan kärjestä: Tähtitaivas.** Erä 1 on taivas pelaajan kaupungista juuri nyt: BSC5, Kuu ja aurinko, horisontti ja hämärä, kamera
ylös. Ohjaus on sormella, ja gyro tulee erässä 2 (kalibrointi, lepotila, simulaattorissa sormi). Tähtikuviot ja planeetat tulevat
erässä 3, nimiöt ja Pulun lyhyt esittely (ääni vasta omistajan linjalla) erässä 4.

Avoimet kysymykset (eivät estä erää 1):
1. Mistä linssi löytyy: kehittäjätila ensin (kuten Maapallon vuosi) vai oma avauskynnys?
2. Gyro-ohjaus kysyy iOS:llä liikelupaa vain, jos käytetään CoreMotionin aktiviteettia. Asentoanturi ei vaadi lupaa. Tarkistan
   laitteella erässä 2.
3. Yökartta on pienin riski ja nopein näyttävä tulos. Jos omistaja haluaa nopean voiton ensin, vaihdan kohdat 1 ja 2.
