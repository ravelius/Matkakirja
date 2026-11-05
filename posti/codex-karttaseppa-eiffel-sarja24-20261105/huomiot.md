# Eiffel – sarja 24 / tilaus #2091, 5.11.2026

**Arviointitoimitus, QA-poikkeamia. Ei hyväksytty Tripo-syöte eikä valmis pelitoimitus.**

Tehtiin tilauksen yksi kierros: seitsemän rakennuskuvaa ja yksi maapohja, yhteensä 8 kutsua. Kaikki PNG:t ovat muuttamattomia natiivikuvia, 1536 × 1024 RGB. Ei uusintoja, skaalausta, retusointia tai teknistä maskikoostamista. QA-vertailukuvat ovat erillisiä apukuvia eivätkä tuotantotiedostoja.

## Havaitut puutteet
- Viistokuvat jäävät silmämääräisesti pyydettyä 60–75 asteen korkeaa katselukulmaa matalammiksi; niiden kulmat eivät myöskään vastaa täysin toisiaan. Kulmaa ei ole kalibroitu.
- Yläkuvan jalanjälki on väärän kokoinen ja siirtynyt. Tasanteet ovat noin 45 astetta väärässä kierrossa suhteessa jalkojen neliöön.
- Ristikoiden pienet yksityiskohdat vaihtelevat kuvasta toiseen. Neljän vaakajulkisivun koko, kolme tasannetta ja maaviiva ovat visuaalisesti yhtenäisiä, mutta tämä ei varmista yhteistä 3D-geometriaa.
- Maapohjan kiveys jää osittain lähteen jalanjälkeä pienemmäksi. Silmämääräisen kiveyspolygonin peitto lähteen maskista on noin 84.5 %, ei pikselintarkan rajauksen hyväksyntä.
- Maapohjan maskin ulkopuolella 1230375 / 1230663 pikseliä muuttui (99.98 %). Koko kuvaa ei saa käyttää kartan korvaamiseen. Vastaanottajan lähdeohjeessa mainittu maskin sisäosan liimaus on yhä tekemättä.
- Kaikkien polkuliittymien, 6–12 metrin leveyksien ja pyyhittyjen alkuperäisten polkujen säilymistä ei pystytty varmentamaan.

## Muoto ja yksinkertaistukset
Vertailuna Commonsin aito Eiffel-valokuva, jonka alkuperäiset tavut ja lisenssi on varmennettu. Neljä levenevää jalkaa, kaaret, kolme päätasannetta ja kapeneva kärki tunnistuvat. Hienot teräsristikot on suurennettu ja yksinkertaistettu. Kuvakohtaisia ristikkoeroja sekä yläkuvan virheellistä tasannerotaatiota ei hyväksytä oikean rakennuksen tarkaksi muodoksi. Valokuvan tilapäistä vihreää rakennussuojaa, puita ja taivasta ei otettu malliin.

Maapohjassa on tyhjää kiveystä, vaihtelevaa nurmea ja polkuja. Työalueella ei näy pystyrakenteita. QA-jalanjalki-vertailu.jpg: sininen on lähteen jalanjälki, punainen silmämääräisesti arvioitu kiveyksen sisäreuna; vain QA.

## Jatko
Karttaseppä / KK arvioi tämän yhden kierroksen. Seuraavasta otosta päättää KK tilauksen mukaisesti. Muita sarjan seitsemää kohdetta ei ole aloitettu. Kuvat eivät mene suoraan Tripolle: omistajan arvio on erillinen. Ei R2-latausta, runtime-kytkentää eikä pelijulkaisua.

SHA256SUMS kattaa koko toimituksen itsensä pois lukien. QA.json sisältää mittaukset ja natiivien SHA256:t. Vastaanoton, omistajan hyväksynnän ja pelikäytön tilat ovat erillisiä.
