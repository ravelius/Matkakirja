# Karttataivas v2 ja neljän suunnan vertailu pelikokeeseen

Panoraama on tiedostossa `/Users/Shared/Claude/proto-3d/_tyo/codex/kartan-taivas-20261106/taivas-kierros-8192x640-v2.png`. Esikatselu on tiedostossa `/Users/Shared/Claude/proto-3d/_tyo/codex/kartan-taivas-20261106/taivas-kierros-v2-neljan-suunnan-vertailu.jpg`. Vertailun vasemmalla puolella on malli #2178 ja oikealla v2:n neljä 64° näkymää. Jokaisessa näkyy alkuperäisen 2752 pikseliä leveän talonäkymän ylin 1140 pikselin kaista. Kaupungin ja käyttöliittymän suojatut pikselit täsmäävät pohjakuvaan kaikissa neljässä sovituksessa.

Tein kuusi erilaista maalausta natiivikoossa 1774 × 887. Jokaisesta rajasin 1774 × 640 pikseliä. Yksi lähdepikseli vastaa yhtä panoraamapikseliä molemmilla akseleilla. Alkukohdat ovat 0, 1366, 2732, 4098, 5464 ja 6830. Edellisen palan loppu oli seuraavan maalauksen viitteenä. Viimeisessä käytin myös ensimmäisen alkua. Ristihäivytin viisi 408 pikselin limitystä ja 412 pikselin pohjoisen kääreen.

Tiedosto on 8192 × 640 sRGB RGB PNG. Pohjoinen on vasemmalla ja kierros etenee myötäpäivään. Korkeus kasvaa tasavälisesti alareunan 0°:sta yläreunan +28°:een. Alimmat 45 riviä ovat kokonaan `#e6e2ca`. Ylätaivaan sävy on `#a8bbce`. Väriliuku seuraa #2181:ssä hyväksyttyä korkeuskulmittaista mittausta. Pilvikorkeuksilla mitattu suurin rivin luminanssiero (95. ja 5. prosenttipiste) on v2:ssa 18,45/255 ja mallissa 18,16/255.

Katsoin kaikki kuusi limitystä täysikokoisina. Siveltimenvedot jatkuvat niiden läpi, eikä vertailussa erottunut pystysuoraa rajaa. Pohjoisen kääresaumassa vierekkäisten sarakkeiden keskimääräinen kanavaero on 0,51/255. Nelisuuntavertailussa pilvien vaalea yläpinta, pehmeä varjopuoli ja yksittäiset siveltimenvedot erottuvat. Idän taivas on avoimin ja lännen pilvi näkyvin. Valosepän pelikoe on seuraava vaihe.

Molemmat toimitustiedostot luettiin takaisin ja SHA256SUMS päivitettiin. Panoraaman SHA256 on `71d13d41e5942bd25256feed2d6d243febae73bfc281bdf83a641374b93bb758` ja vertailun `563132bd3f49d3e7dd2f00c9bedba1cf16404004843b8146afe480e42a8cee04`. Tilaus #2182.
