# Louvre K1 v1 — ensimmäinen natiivi tarkistusehdokas, #285/#298

Kuva ja oma palatsimaski ovat kumpikin 1536 × 1024. Kuva on sisäisen kuvatoiminnon muuttamaton PNG-natiivi, yksi kokonaan uusi generointi. Sama 3:2-kuvasuhde kuin lähteessä; ei suurennusta, rajausta, venytystä, API:a tai CLI:tä.

**Tätä kuvaa ei ole hyväksytty sitovaksi mallinnustavoitteeksi.** Keskipaviljongin ja kupolin siluetti sekä siipien ja taustan massat poikkeavat näkyvästi annetusta massakuvasta. Syvyyssuhteissa on epävarmuutta. Lukittu kamera ja 45 asteen pystykenttä on säilytetty toimitettavassa kameramäärityksessä; generoidun näkymän todellista kameraa ei ole varmennettu pelkällä promptilla.

**IoU on null / odottaa Linnanrakentajan natiivirenderiä. 95 prosentin raja pysyy.** Lähteen #298 mukaan LiDAR-massa ja maski renderöidään uudelleen suoraan 1536 × 1024-kankaalle alkuperäisestä kamerasta, ei pienentämällä vanhaa 2400-maskia. Tällaisen uuden renderin puuttuessa ei ole sitovaa IoU-tulosta eikä läpäisyväitettä. Yhtään massapoikkeamaa ei selitetä yleisellä LiDAR-poikkeusluvalla.

Oma maski on käsin jäljennetty varsinaisesta uudesta kuvasta. Lähdemaskia ei käytetty sen piirtämiseen. Se esittää tässä kuvassa tulkittua palatsia; epävarmat kaupunki/palatsi-rajat, pienet reunat ja esteiden taakse täytöt on yksilöity mask-provenance.json-tiedostossa. Maski on teknisesti binäärinen L/0/255, mutta sen semanttista pikselintarkkuutta ei ole sertifioitu riippumattomasti. Courtyard-aukot, patsas, kasvillisuus ja teksti eivät kuulu rakennusmaskiin.

Kuvassa on vaalea säänkulunut kivi, tummat katot, kivetty piha, ratsastajapatsas ja pieni havainnekuva-merkintä. Lasipyramideja tai altaita ei näy. Patsaan tarkkaa karttasijaintia, jokaista julkisivuyksityiskohtaa tai auringon tarkkaa atsimuuttia/korkeutta ei ole varmennettu.

Linnanrakentajan uusi maskivertailu ja PT:n palaute seuraavat. K1:tä ei uusita eikä K2–K7:ää aloiteta ilman uutta palautetta. Tämä on sisäinen tarkistustoimitus: ei R2:ta, peli-integraatiota, 3D-mallikierroksia, main-yhdistämistä tai julkaisua. Vertailuarkin pienennetyt esikatselut eivät korvaa natiiveja.
