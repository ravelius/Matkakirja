# ISS-animaatio: omistajan palaute 14.10.2026 noin klo 12.25 (TF 189, iPad)

Kuvat ovat tässä kansiossa: `iss-palaute-1225-1-maasto-tarkkuus-raja.webp`, `-2-horisontti-harmaa-latausruutu.webp`, `-3-alapaneeli-luvut.webp` ja `-4-iss-pulun-teksti-piilossa.webp`.

## Omistajan sanat (sanatarkasti)

> iss animaatio oli nyt jo hurjan paljon parempi. huomioita:
>
> 1. kuva: osa maanpinnasta näkyy tarkkana mutta rajautuu sitten äkisti matalampaan tarkkuuteen. saako tarkempaa näkymää tehtyä kauemmas? latausruudulla pitäisi muuten olla läpinäkyvä tekstilaatikko (nyt harmaa) eli myös tekstilaatikot läpinäkyviksi kaikissa peleissa ja linsseissä, ei pelkästään napit.
> 2. kuva: horisontissa näkyy harmaata vaikka pitäisi olla merta. saisiko tuonne animoitua myös valaan joka hyppää meressä?
> 3. kuva: paneeli ruudun alalaidassa tarvitsee parannusta. paneelin itseasiassa voisi poistaa ja siirtää luvut ruudulle suoraan. niissä saisi olla omat otsikot ajalle, nopeudelle, yms. miten nämä näytetään space X lennoissa? voisi kopioda samantyylisen esityksen tähän.
> 4. kuva: ISS:n sisällä tuon pulun selitystekstin voi ottaa pois kokonaan (nyt jää pulun taakse piiloon)
>
> esittelyteksti on todella hyvä. näkyykö siellä myös kuu? ruudulla voisi näkyä myös pienoismaapallo kuten astronauttien kuvissa joka kääntyisi kokoajan reaaliajassa näyttämään missä mennään. saako ISS:n näkymässä ison maapallon pinnalle kiinnitettyä kaupunkien ja maastokohteiden päälle nimiä? samoin meret saisi nimetä. Teksti saisi olla piirrettynä pallon pinnalle jos mahdollista, jolloin se liikkuisi luonnollisemman näköisesti.
>
> kertojan kertomus loppuu siihen kun kertoja pyytää napauttamaan maapalloa jolloin maapallo kelautuu nopeasti seuraavaan kohtaan. kelaus on kuitenkin niin nopea että kertojan lauseet katkeavat kesken. voisiko lauseet toistaa rauhassa loppuun. ei haittaa vaikka ne tulevat sitten vähän myöhässä. suurin ongelma on kuitenkin se että kertomus päättyy tähän. kertoja voisi kysyä vielä haluatko nähdä jonkun toisen paikan tai haluatko alkaa ohjata alusta itse.
>
> kertojan ääni ei meinaa kuulua tarpeeksi hyvin, varsinkin lähtölaukauksen aikana, pulun ääni kuului hyvin.
>
> kun rakettin on kohdassa missä pulu sanoo, että livia max ja peruukki lähtee, niin silloin animaatio saisi näyttää tärinää raketissa ja ruudulla kaikkein eniten.

## Työkohdat (Keskustelukanavan jako, PT päättää tekijät)

1. **Maaston tarkkuusraja (kuva 1):** Andøyan tarkka alue loppuu äkisti karkeaan. Tarkka näkymä ulotetaan kauemmas, tai raja tehdään pehmeäksi niin, ettei siihen synny näkyvää reunaa. Myös nousun aikana kuva 3:ssa näkyvät karkeat sinertävät laatat korjataan.
2. **Tekstilaatikot läpinäkyviksi (omistajan tyylipäätös):** latausruudun harmaa tietolaatikko (kuva 2, "ISS:lle lennetään…") muutetaan läpinäkyväksi. Sama koskee kaikkia tekstilaatikoita kaikissa peleissä ja linsseissä, ei vain nappeja. Muutos tehdään pohjiin (UI-POHJAT), ja linjaus kirjataan Raamattuun.
3. **Horisontti (kuva 2):** kaukana näkyvä harmaa vyö muutetaan merivedeksi horisonttiin asti. Lisäksi mereen tulee animoitu, hyppäävä valas.
4. **Alapaneeli pois (kuva 3):** luvut tulevat suoraan ruudulle läpinäkyvinä SpaceX-lähetysten tyyliin. Jokaisella luvulla on oma pieni otsikko (AIKA, KORKEUS, NOPEUS, G), ja kellona on T+ tai T−. Alareunaan tulee aikajana tapahtumapisteineen (Max Q, moottorien sammutus, vaiheiden erotus, kiertorata). Ohita- ja Käynnistä-napit tehdään läpinäkyvinä nappipohjilla.
5. **ISS:n sisällä (kuva 4):** Pulun selitysteksti ("Lennä raketilla ISS:lle…") poistetaan kokonaan.
6. **Uutta ISS-näkymään:**
   - Kuu näkyy oikeassa paikassaan ja vaiheessaan (nyt sitä ei ole koodissa).
   - Pienoismaapallo astronauttikuvien tapaan kääntyy reaaliajassa ja näyttää aseman paikan.
   - Kaupunkien, maastokohteiden ja merten nimet piirretään ison maapallon pinnalle, jotta ne liikkuvat pinnan mukana.
7. **Kertoja:**
   - Kun maapallo kelautuu napautuksesta, kertojan lause puhutaan rauhassa loppuun, vaikka se tulisi myöhässä.
   - Kertomus ei pääty kelaukseen. Kertoja kysyy: "Haluatko nähdä jonkin toisen paikan, vai haluatko alkaa ohjata itse alusta?" Sisältökirjuri kirjoittaa repliikit, ja ne generoidaan pysyvällä kertojaluvalla.
8. **Äänitasot:** kertoja kuuluu liian hiljaa, varsinkin lähtölaukauksen aikana, mutta Pulu kuuluu hyvin. Kertojaa nostetaan, ja moottorin ääni vaimenee puheen alle. Tasot tarkistetaan ääniportilla.
9. **Max Q (Pulun repliikki "Max Q ja peruukki lähtee"):** raketin ja ruudun tärinä on voimakkaimmillaan juuri tässä kohdassa.

Kiitos omistajalta: "iss animaatio oli nyt jo hurjan paljon parempi" ja "esittelyteksti on todella hyvä".
