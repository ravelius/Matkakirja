# Codex → KK/PT: #2261 yksi korjausyritys — STOP, kuva päätettäväksi

15.11.2026. #2253:n kolmesta alkuperäisestä tehtiin erillinen kevyt johdannainen. Tripo-ottoja 0, krediittejä 0. Katon yksi sallittu korjausyritys on käytetty. Katon sauma ja pinta eivät ole siistit, joten pysähdyin ohjeen mukaisesti; en tee toista kattokorjausta ilman KK:n uutta päätöstä.

**Tulos on hylätty tarkastelukopio, ei peliin hyväksytty malli.** Katso ensin 01-north.png sekä 06-upper-oblique-full.png ja vastaavat guide-kuvat toimitushakemistosta. Kuvat on otettu varsinaisesta uudelleen avatusta 2048-version GLB-viennistä; lähdeohjain käyttää samaa kameraa.

## Havaittu tulos

| Kohta | Tulos |
|---|---|
| 1. SW-neliöpaviljonki / telttakatto | PARTIAL: tunnistettava paviljonki säilyy, tarkkoja lähdemittoja ei vahvisteta. |
| 2. Piha | PASS rajatussa näytteessä: piha näkyy avoimena, 0/4 pystysädeosumaa. |
| 3. Kaksi E–W-harjaa ja kattosaumat | FAIL: lähteen K368–431-kattomassat lisättiin, mutta räystäs-/liittymäsaumaan jäi epäsiisteyttä ja oma liusketekstuuri toistaa vaaleita raitoja. Yhden yrityksen STOP. |
| 4. Porttikäytävä | FAIL: pohjoispäätä avattiin lähteen kolmen kaariprofiilin mukaisesti, mutta edelleen **6/6 sädeosumaa**. Osumat siirtyivät generoidun A:n eteläseinään Y≈−1,4…−1,9; lähteen katettu leikkaus loppuu Y=3. Lähteessä samat säteet 0/6. Generoidun julkisivun vanha koristekaari ja lähdekoordinaattien aukko eivät myöskään osu kohdakkain. Ei läpikulkuhyväksyntää. |
| 5. NE, korkein pyöreä torni | PARTIAL: pyöreä torni säilyy, vertailu lähteen mittasuhteisiin jää vajaaksi. |
| 6. Konsolit | PARTIAL: kannakkeet säilyvät näkyvissä, tarkkaa 6,5 m:n korkeusvastaavuutta ei vahvisteta. |

C:n suunta tarkistettiin lähteen epäsymmetrisistä ankkureista: savupiippu pitkän haaran porttipäässä, SW-paviljonki lyhyen haaran vastakkaisessa päässä. Tämä järjestys on oikein. Nykyistä kätisyyttä ei muutettu sovituslukujen perusteella; C:n tarkkaa muoto- ja saumavastaavuutta ei silti väitetä täydelliseksi.

Leikkauskäytävien pinnat ja uudet päätytäytöt käyttävät A:n omasta kivestä otettua pintaa, kattolappeet A:n omasta liuskepinnasta otettua palaa. Uutta kuvagenerointia ei tehty. Riippumaton kuvantarkistus päätyi samaan FAIL/STOP-arvioon.

## Tarkastelutiedosto ja säilytys

T7:llä: `output/grand-chatelet-2237-20261115/correction-2261/grand-chatelet-2261-REVIEW-FAILED-2048.glb`

- 75 112 kolmiota, 9 926 096 tavua (noin 9,9 Mt).
- 8 upotettua tekstuurikuvaa: värikuvat 2048, normaalikuvat 1024, kaksi omaa materiaalipalaa 256. Koot tarkistettu GLB:n todellisista kuvatavuista.
- SHA256 `5a47d6929bc4e5671064f6d098858aee97386c619c9afcde223bf63a687fdb40`.
- Tekniset kokorajat täyttyvät; visuaalinen ja läpikulku-QA eivät.
- A/B/C Max-alkuperäiset ja lähdeverkon aineisto säilyvät T7:llä. Kolmen alkuperäisen SHA256 tarkistettu muuttumattomiksi.
- Väliviennissä löytyi vanhoja pakattuja 8K/4K-kuvatavuja; tämä vientipakkaus korjattiin lukemalla pienennetyt kuvat uudelleen. Se ei ollut toinen geometriakorjaus. Virheellistä suurempaa välivientiä ei tarjota peliin.
- Paikallinen Blender-työ: kahden säikeen geometria ja alle sekunnin Workbench-kuvasarja, ei raskasta renderiä tai leivontaa Unityn ollessa käynnissä.

Pyydetty KK:n päätös: jätetäänkö alkuperäinen A:n katto kuten tilauksessa mainittu vaihtoehto, vai annetaanko uusi erikseen rajattu korjausohje? Portin visuaalisen paikan ja eteläpään poikkeama on ratkaistava ennen NS:n lataustietä. En käynnistä uutta Tripoa, muuta peliä tai tulkitse tätä hyväksytyksi.

Kuvat ja raportit: `posti/codex-grand-chatelet-2261-korjauskoe-20261115/`.

## #2265–2266 luettu

#2265:n omaa #2261/#2262-toimitusta koskeva vastaanotto luettu commitista 3f2650f60ba3dbc73cc8705cbbfa1faabe4338e9. Rooman kuva on toisen tuottajan työ, ei uutta tuotantoa tässä.

#2266 luettu kokonaan commitista 4b2260ceb95bbbe1369853fe6620c13892741642 / blob 1d70ce517ed3c3db8d4392087acff57c12cd1dad. Valinta Turun linna, itäpää/eteläsiipi, yksi rajattu koe; Kronborg ja Hämeen linna eivät jatka eikä uusia ehdokkaita haeta.

**Kyllä: #2257:n Turun ja Hämeen tietoja haettiin avaamalla Finnan tietuesivuja web-työkalulla; kuvia ei ladattu tai katsottu.** Tämä käy ilmi turku-evidence.json- ja hame-evidence.json-lokeista. Uuden kiellon jälkeen ei tehdä Finna- tai API-hakuja.

Odotan SK:n/KK:n toimittamaa sallittua lähdekuvaa. Sen jälkeen raportoin leikkaustason, kerrokset, holvit, portaat, luettavuuden, rakennusvaiheen ja epävarmuudet sekä enintään 1000 px kuvan. Mallikuva vasta KK:n sanasta tämän jälkeen; yksi Tripo-otto vasta KK:n lähdevertailun jälkeen. KK:n pelin näyttötapasuunnitelma kuuluu leikkaustason valintaan.
