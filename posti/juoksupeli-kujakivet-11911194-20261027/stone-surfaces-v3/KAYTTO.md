# Kivipinnat 1191–1194 — Lavastajan UV-sopimus

Neljä muunnelmaa jokaiseen pintaan. Valitse sama v01–v04 sokkelille, sen yläpinnalle sekä pilarin etu- ja sivupinnalle. LR tekee geometrian ja asettaa pinnat nykyiseen peliin; tässä ei ole Tripo-malleja tai pelin koodimuutoksia.

| Pinta | Metriä (kuvan leveys × korkeus) | PNG px | Toisto |
|---|---|---|---|
| reunakivi | 0,70 × 0,52 | 360 × 266 | yksi kivi, Clamp |
| sokkeli | 2,00 × 1,20 | 1024 × 614 | X Repeat, Y Clamp |
| sokkelin-ylapinta | 2,00 × 0,10 | 1024 × 51 | X Repeat, Y Clamp |
| pilarin-etu | 0,60 × 1,20 | 307 × 614 | Clamp |
| pilarin-sivu | 0,40 × 1,20 | 205 × 614 | Clamp |
| lattialaatat | 2,00 × 2,00 | 1024 × 1024 | X/Y Repeat |

Sokkelissa neljä 0,30 m kivikertaa. Kuvan yläreuna on ylin kerta ja vastaa yläpintanauhan saumoja. Nauhan y=0 vastaa etureunaa. Pilarin etukuvan OIKEA reuna ja sivukuvan VASEN reuna liittyvät samaan ulkokulmaan: pitkä/lyhyt 0,40/0,20 m kivi vaihtuu kerroksittain, ei maalattua saumaa itse kulmaan. Kuvien korkeussuuntaa ei saa kääntää erikseen. Kaikkien varianttien kulman albedo/height/roughness-jatkuvuus tarkistettu yhtenäisen materiaaligraafin samassa kulmapisteessä.

Reunakiven avattu poikkileikkaus kuvan yläreunasta: 0,30 m yläpinta, 0,02 m viiste, 0,20 m etupinta (rajat pikselikoordinaateissa 153,462 ja 163,692). Ei päätysaumaa albedossa: 6 mm V-urasaumat tehdään LR:n geometriassa. Reunojen kuluma on maltillinen korkeus-/normaalipinta.

Lattian kuvan pystysuunta on kujan suunta. Neljä 0,50 m kaistaa, kivien pituus 0,60–1,20 m, lomitus; sokkelin kivipituudet 0,55–0,80 m. Sauma 1 cm, reunoilla alle millimetrin epäsäännöllisyys. Lattian kivet ovat viidessä lähellä toisiaan olevassa harmaassa sävyssä. Toistuva geometrinen jako ja lähikuvan mahdollinen toisto arvioidaan pelin kameralla.

Jokaisessa kansiossa:
- albedo: sRGB PNG, valaisematon pohjaväri. Esikatselun valoa/AO:ta/varjoa ei ole leivottu siihen.
- normal-opengl: lineaarinen tangenttiavaruuden +Y-normal map. PNG:n rivit kulkevat alas, tavallinen UV-v kulkee ylös. Jos importer käyttää DirectX/-Y-normalia, käännä vihreä kanava importerissa. Älä käännä koko kuvaa yhden kanavan sijasta.
- roughness: lineaarinen harmaasävy, valkea = karhea. Jos moottori käyttää smoothnessia, smoothness=1−roughness. Metallic=0.
- height: vapaaehtoinen 16-bit lineaarinen PNG, korkeus metreinä = arvo/65535 ×0,007 −0,006. Älä lisää displacementia normaalin lisäksi automaattisesti; normal riittää mobiiliin. Nämä eivät muuta törmäyspintaa.

Albedo on näytteistetty neljästä muuttumattomasta tekoälymateriaalipohjasta mittatarkan materiaaligraafin UV:illa. Saumat, viisteet ja vähäinen mikrokohouma ovat koodilla määriteltyjä. Normal/height eivät ole generoidun kuvan varjoista pääteltyä syvyyttä. Tämä on tekninen materiaalipaketin bake, ei uusi kuvagenerointi tai alkuperäisten havainnekuvien maalaus.

PNG-mitat ovat tarkoituksella osin ei-kahden-potensseja: ne ovat LR:n tarkka tilaus. Älä anna importerin neliöidä tai rajata niitä; mahdollinen kompressio/resample pitää säilyttää UV-alue. 512 px/m on pyöristetty annettuihin pikselimittoihin. Native-materiaalipohjat ovat 1254 ×1254, niiden alkuperäiset pikselit ja SHA:t T7:llä SOURCE-INVENTORY.json:n poluissa.

Tarkistettu: 96 tiedoston SHA/readback, tarkat koot, normalin yksikköpituus ja eteenpäin osoittava Z, height-metrialue, karheuden rajat, jatkuvat toistorajat, sokkelin yläpinnan samat saumakeskikohdat, pilarikulman yhteinen piste. Vertailuarkit näyttävät havainteen ja materiaalin teknisen esikatselun. Ne eivät ole valmiin pelin samasta kamerasta otettu parikuva. LR tekee seuraavaksi varsinaisen parikuvan; KK/omistajan hyväksyntä on avoin.
