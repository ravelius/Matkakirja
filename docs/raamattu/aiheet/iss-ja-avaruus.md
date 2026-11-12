# iss-ja-avaruus · vastuu VS · tarkistettu 12.11.2026

TAVOITE: Pelaaja nousee raketilla avaruusasemalle, ohjaa sitä ja kuvaa minkä tahansa paikan Maasta omaksi julisteekseen. Astronautin kamerassa hän selaa aseman oikeita valokuvia, ja kypäräpäinen Pulu kertoo niistä.

SÄÄNNÖT:
1. Raketti lähtee Andøyalta Tromssan läheltä, kun pelaajalla on £500. Ensimmäisen lennon jälkeen asema ja raketti ovat ilmaisia linssivalikosta. [R-2.105]
2. Lento alustalta Cupolaan on pelin omasta kohtauksesta kuvattu video, joka päättyy häivytyksellä elävään Cupolaan. Lento alkaa itsestään latauskuvan jälkeen, ensimmäinen kestää 60–90 s, myöhemmät ovat lyhyitä ja Ohita on aina. [R-2.105]
3. Lennon aikana näkyvät nopeus, korkeus, aika ja G, ei logoja. [R-2.105]
4. Ohjaamossa nopeuskahva on vasemmalla, joystick oikealla ja iso vaaleanvihreä LCD keskellä; vain omat säätimet toimivat. [R-2.104] [R-2.103]
5. Kaasun muutos näyttää hetken kertoimen ja todellisen nopeuden; lukema on vihreä, 300-kertaisesta oranssi ja 1000-kertaisesta punainen. Suuressa vauhdissa reunat sumenevat ja alus heiluu. [R-2.104]
6. ISS-kamera kuvaa minkä tahansa paikan rajattomasti ja ilmaiseksi, laaja- tai teleobjektiivilla. Kuva näkyy Cupolan ikkunassa ja tallentuu Kuviin ja Matkalaukkuun pystyjulisteena. [R-2.103]
7. Astronautin kamera avautuu mustasta ruudusta logon kautta. Asema kiertää oikealla radallaan ja pallo pyörii sen mukana, kunnes pelaaja pysäyttää. [R-2.115]
8. Valokuva aukeaa koko ruutuun: laajennettava selite vasemmalla ylhäällä, X oikealla ylhäällä, pienoiskuvat vasemmalla alhaalla. NASA-kuvan valkoinen tunnuspalkki rajataan pois. [R-2.117] [R-2.116]
9. Astropulu on kypäräpäinen minipulu ilman ympyrää. Se tuntee avatun kuvan eikä paljasta pelaajan sijaintia; kuvalle tehdään ensikatselulla kolme lyhyttä kysymystä, jotka vaihtuvat kuvan mukana. [R-2.117] [R-2.31]
10. Ohjaamossa kuuluu satunnaisesti NASAn aitoja radioäänitteitä. Astronautin kuvissa soi taustaäänenä hiljainen avaruushumina ilman musiikkia. [R-2.104] [R-2.117]

EI VIKA:
- Tähdet pysyvät paikallaan suurimmassakin vauhdissa.
- Ohjaamossa pallon kosketus ei tee mitään.
- Astronautin kamerassa ei ole yläpalkkia eikä Liiku-nappia.

TEKOTAPA:
- Julisteen malli: proto-3d/_valmiit/hyvaksytyt-mallit/iss-juliste-e3-20261001/.
- Natiivikoodi (Assets/Matkakirja/): Linssit/Ydin/Astronautti/AstronauttiLinssi.cs, Linssit/Unity/AstronauttiKerros.cs, UI/Linssit/AstronautinNakyma.cs; raketti Linssit/Unity/RakettiLaukaisu.cs. Reliefi: tools/tee-reliefikartta.mjs.
- Raketin videon teko: grafiikan-tuotanto.
