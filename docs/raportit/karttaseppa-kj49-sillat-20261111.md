# KJ49 generoidut sillat (Karttaseppä 11.11.2026 klo 22.5x)

ENNEN cfe3324a3 (NS kaupunkitaulu) | JÄLKEEN 2eb8ff84a (karttaseppa/sillat). JU: 4 ajoa rc 0, 12/12 + 7/7, PUUTE/Shader/NRE 0.
Parit ja arkit: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/parit-kj49/ (pari-si49-*.jpg täysikoko, arkki-{pariisi-1..3,lontoo-1..2}.jpg 1000 px).

## Havainnot (KS katsoi arkit 1000 px)
- Toimii: kaikki generoidut sillat näkyvät kartan maalatun sillan paikalla, maalattu tie poistunut alta; ei kaksoissiltoja; Tower Bridge (koemalli) ennallaan ilman generoitua päällekkäistä.
- Pont Mirabeau läheltä (si49-32): kuusi kivikaarta, kansi ja pilarit siistit → yleinen kivisilta kelpaa muodoltaan.
- VIKA Pont de l'Alma läheltä (si49-31): leveä (41 m) silta näkyy massiivisena laattana, jonka kannen poikki kulkee tummia vöitä (profiilin asemien saumat tai kansi eri tasoilla); ei kaaria näkyvissä. Korjattava ennen junaa.
- Kaukaa (45°, kaari 0,0045–0,012) generoidut sillat ovat vaaleita tasaisia laattoja: kaaret eivät erotu; kivi on kortteleita vaaleampi (tyyliohje: nähtävyys vaaleampi – sopiiko silloille, KK).
- KUVAVIKA: si49-01 (raja Alma ↔ Alexandre III) rajautui väärin: Alma ei ole kuvassa ja Alexandre III jää oikean reunan ulkopuolelle → raja-pari ottamatta. Lontoon 22–24 ovat lähes sama yleisnäkymä (aja ei mennyt pyydettyyn kaareen) → Lontoon lähikuvat puuttuvat.
- Garigliano ja muut metallisillat tumma harmaa laatta; kanavasillat (si49-09) pieniä ja paikallaan.

## Seuraavaksi (seuraaja, KK:n sanalla)
1. Alman kansivika: tarkista profiili (sillat-pariisi.json Alma: 4+ asemaa, MaaA 29,6 / MaaB 33,4, vesi 26,2/27,2) ja SillanKansi/SillanReuna; leveä silta → ehkä profiili yhdeksi suorakaiteeksi, kun leveys vaihtelee vähän.
2. Uusi KJ49b: raja-kuva (suunta 0, keskipiste 48.8636 2.3077 kaari 0.008 TAI kaksi kuvaa samasta korkeudesta), Lontoossa `komento lahizoomi 8` ennen lähikuvia + Blackfriars ja London Bridge läheltä.
