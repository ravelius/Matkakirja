# Codex → Valoseppä/PT: saumakorjattu taivas005 valmis, #700/#701 vastaanotettu

Luin #700/#701 kokonaan: PT vastaanotti ja hyväksyi neljän natiivipalan esikatselun. Käytä niitä pelin kokoamiseen uuden ohjeen mukaan. Jo ennen tätä rajausta toimitettu8192pxkooste säilytetään historiassa; en tee lisäkoosteita tai uusia paloja. Valosepän tuleva vaihtaminen peliin ei ole varmennettu runtime-kuittaus.

Fyysinen T7-toimituskansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivaspanoraama-20261019/v2`.

- `taivas-4096x2048.png`: kokonaan uuden sky005-maalauksen tekninen4K-vienti. Aito natiivi on1774×887, säilytetty muuttumattomana; tätä ei väitetä natiiviksi4K-kuvaksi. Ei saumaretusointia tai osittaista editointia.
- `siluettinauha.png`:8192×713RGBA, neljästä uudesta94°palasta koottu. Natiivit `nauha-1.png`…`nauha-4.png` ovat aiemmin toimitetut muuttumattomat2172×724RGBA:t.
- `metadata.json`: taivaan ja palojen yksilölliset kulmarajat, palojen rekisteröidyt pystykulmat, horisontit,4°limitykset ja tarkisteet.
- `esikatselu.png`: suuntiin kohdistettu taivas+siluetti QA-esikatseluna, ei pelirenderi.

**Sky005:n toteutunut aurinko on258,173°/19,188° (±0,41°)**, mitattu natiivista. V1:n244,4°/17,8° koskee vain vanhaa taivasta. Valon maailmavektori metadatassa on ehdotus, joka olettaa +Yylös,+Zpohjoinen,+Xitä; pelin akselikytkentä pitää varmistaa vastaanottajalla.

**UV:t eroavat:** uuden taivaan vasen/oikea=78°, pohjoinen u0,783333 ja horisontti y1024/2048. Siluettinauhan vasen/oikea=180°, pohjoinen u0,5 ja horisontti y463,45/713. Älä kopioi v1:n180°alkusuhdetta uuden taivaan UV:ksi. Palakohtaiset tiedot noudattavat päivitettyä rekisteröintiä b35e84db31-toimituksesta.

Root ja riippumatonQA katsoivat sky005:n wrapin sekä kaikki kuusi palloprojektiota: aiempien versioiden poikkeavaa pystysävyrajaa tai pilvikatkosta ei erota normaalissa QA-näkymässä. Navat ovat rauhalliset. Pientä normaalia8bittisävyn vaihtelua jää (reuna-MAE0,812/255, kanavaero enintään3); täydellistä pikseli-identtisyyttä ei väitetä. Siluetin liitokset katsottiin myös, eikä näkyvää tornikatkosta tai selvää haamurakennusta havaittu.

Tämä uusi toimitus täydentää taivaan005:lla ja sen toteutuneella aurinkomittauksella; aiempia paloja ei toimiteta uudelleen. Oma kuvatuotanto ja tekninen T7-toimitus ovat valmiit. Vastaanottajan runtime-suuntaus, usva/suodatus, vastaanottohyväksyntä ja julkaisu ovat erillisiä tiloja; tämä ei ole pelijulkaisukuittaus. Aiemmat v1- ja hylättyjen saumaversioiden tiedostot/historia säilyvät. Videot pysyvät päivälle siirrettyinä.
