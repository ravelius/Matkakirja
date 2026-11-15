# Tripo 3D → KK: halkaistun rakennuksen työkalut ja Temple-korjaus luettu (#2243–2245, 15.11.2026)

Grand Châtelet'n viisi referenssiä on toimitettu ensin: commit beb89be89d04d05986a1702c79a0695a771572d0, posti/tripo3d-kk-grand-chatelet-2237-2242-referenssit-20261115.md. Jokaisen toimitustiedoston tavut on tarkistettu etästä. Odotan nimenomaista kuvahyväksyntää ennen sen yhtä Tripo-ottoa.

KORJAUS #2245 luettu kokonaan commitista 2fd153aa17df1cd2840cd12c1033de6ab9879bb0 (korjausblob 9f0c2dbcde5e917ed79ff99a2fba55259b0f517c, päivitetty tilaus fd606e4e764935040f004a6ca9f1295159a6610b). Halkaistun kokeen kohde on nyt Temple-torni, Pariisi 1792–1793. Vapaavalintainen Arques-esimerkki jää pois; siitä ei generoitu mitään.

## Ilman krediittejä tehty ominaisuusselvitys

- **Moninäkymä**: saman kohteen 2–4 kuvaa, käyttöliittymässä Front/Left/Right/Back. Suljettua tornia ja eri tavoin halkaistua tornia ei kannata yhdistää samaan syötteeseen: kuvien pitää esittää samaa rakennetta. Maxin erillinen 30 kuvan Batch tuottaa erillisiä malleja, ei yhtä 30 näkymän mallia. [Tripon ohje](https://www.tripo3d.ai/product-doc/model-generation/multi-view-to-3d)
- **Osittaminen**: Segment erottaa olemassa olevan mallin osia automaattisesti tai osan/värin perusteella. Generate in Parts tekee tämän generoinnin yhteydessä. Quick Cap sulkee leikkausaukkoja tasaisesti; AI Completion täydentää osan suljetuksi. Nämä eivät itsessään osoita, että historialliset piilossa olevat kerrokset, portaat ja huoneet syntyisivät oikein. [Tripon ohje](https://www.tripo3d.ai/product-doc/module-post-processing/segmentation)
- **Hologram ja Retopo**: Hologram auttaa katsomaan olemassa olevan geometrian läpi. Retopo vähentää tai järjestää polygoneja. Kumpaakaan ei dokumentoida historiallisten sisätilojen suunnittelutyökaluksi. [Smart Mesh](https://www.tripo3d.ai/product-doc/ai-3d-models/p-series-smart-mesh), [Retopo](https://www.tripo3d.ai/product-doc/module-post-processing/retopo)

**Suositus kokeeseen:** teen lähteiden perusteella jo valmiiksi pystysuunnassa puoliksi leikatun Temple-mallikuvan. KK vertaa sitä lähteisiin. Vasta hyväksytystä kuvasta Tripo-otto, jonka jälkeen tarkistan, ovatko tasot ja aukot oikeaa geometriaa vai pintaan leivottua kuvaa. Ei lupausta, että Tripo onnistuisi tässä; tämä on juuri kokeessa selvitettävä asia.

Kirjautuneessa käyttöliittymässä tarkistettu HD H3.1 Best Quality, Generate 45 krediittiä ja Segment 40 krediittiä. Kaksi perusottoa olisi 90 krediittiä, jos valinnat eivät muuta hintaa; lopullinen hinta luetaan ennen jokaista käynnistystä. Lisätoimintoja ei käynnistetty. Saldo ennen/jälkeen 15490. Kokeessa yhä **0 Tripo-ottoa, 0 krediittiä**.

## Temple-työ seuraavaksi

Luin H-LAHTEET.md:n kohdan 3 ja H-PAIKAT.md:n Temple-osan. Haen Bourlan 1793 -leikkausta ja Curzonin kuva-/tekstiperustaa, ja teen tyhjät lähteisiin perustuvat kerrokset ilman keksittyä kalustusta. Curzonin lukujen 39/50 m ristiriitaa ei piiloteta. Myöhempi suuntamittaus 32°/122° ±5° korvaa vanhan 0°-arvion.

Enintään kaksi Tripo-ottoa / noin 100 krediittiä, KK:n kuvahyväksyntä ennen jokaista. Koe ei mene peliin. Alkuperäiset ja tarkin mahdollinen Tripo-tulos säilyvät T7/NASilla. Mallikuva ja lähteisiin verrattu epävarmuusraportti tulevat seuraavaksi hyväksyttäväksi.
